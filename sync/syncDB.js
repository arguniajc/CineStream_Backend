// sync/syncDB.js
require('dotenv').config();
const { dbPrincipal, dbSecundaria } = require('../models');

const syncData = async () => {
    try {
        console.log('🚀 Iniciando sincronización...');

        const modelosPrimarios = [
            { nombre: 'Actor', camposClave: ['nombre'] },
            { nombre: 'Compania', camposClave: ['nombre'] },
            { nombre: 'Director', camposClave: ['nombre'] },
            { nombre: 'Genero', camposClave: ['nombre'] },
            { nombre: 'Idioma', camposClave: ['nombre'] },
        ];

        for (const { nombre, camposClave } of modelosPrimarios) {
            console.log(`🔄 Sincronizando modelo: ${nombre}...`);
            try {
                const ModelPrincipal = dbPrincipal[nombre];
                const ModelSecundaria = dbSecundaria[nombre];

                const datos = await ModelPrincipal.findAll({ raw: true });

                for (const item of datos) {
                    const whereCond = {};
                    camposClave.forEach(campo => {
                        whereCond[campo] = item[campo];
                    });

                    const existente = await ModelSecundaria.findOne({ where: whereCond });

                    if (!existente) {
                        await ModelSecundaria.create(item);
                        console.log(`✅ Insertado: ${nombre} → ${JSON.stringify(whereCond)}`);
                    } else {
                        await ModelSecundaria.update(item, { where: whereCond });
                        console.log(`📝 Actualizado: ${nombre} → ${JSON.stringify(whereCond)}`);
                    }
                }
            } catch (errModelo) {
                console.error(`❌ Error sincronizando modelo ${nombre}:`, errModelo);
            }
        }

        // Sincronizar Pelicula
        try {
            console.log(`🔄 Sincronizando modelo: Pelicula...`);
            const peliculas = await dbPrincipal.Pelicula.findAll({ raw: true });

            for (const pelicula of peliculas) {
                const whereCond = {
                    titulo_espanol: pelicula.titulo_espanol,
                    titulo_original: pelicula.titulo_original
                };

                const existente = await dbSecundaria.Pelicula.findOne({ where: whereCond });

                if (!existente) {
                    await dbSecundaria.Pelicula.create(pelicula);
                    console.log(`✅ Insertada Pelicula: ${JSON.stringify(whereCond)}`);
                } else {
                    await dbSecundaria.Pelicula.update(pelicula, { where: whereCond });
                    console.log(`📝 Actualizada Pelicula: ${JSON.stringify(whereCond)}`);
                }
            }
        } catch (errPelicula) {
            console.error('❌ Error sincronizando Pelicula:', errPelicula);
        }

        // Relaciones
        const relaciones = [
            { nombre: 'PeliculaActor', camposClave: ['pelicula_id', 'actor_id'] },
            { nombre: 'PeliculaDirector', camposClave: ['pelicula_id', 'director_id'] },
            { nombre: 'PeliculaCompania', camposClave: ['pelicula_id', 'compania_id'] },
            { nombre: 'PeliculaGenero', camposClave: ['pelicula_id', 'genero_id'] },
            { nombre: 'PeliculaIdioma', camposClave: ['pelicula_id', 'idioma_id'] },
        ];

        for (const { nombre, camposClave } of relaciones) {
            console.log(`🔄 Sincronizando relación: ${nombre}...`);
            try {
                const RelPrincipal = dbPrincipal[nombre];
                const RelSecundaria = dbSecundaria[nombre];

                const datos = await RelPrincipal.findAll({ raw: true });

                for (const item of datos) {
                    const whereCond = {};
                    camposClave.forEach(campo => {
                        whereCond[campo] = item[campo];
                    });

                    const existe = await RelSecundaria.findOne({ where: whereCond });

                    if (!existe) {
                        // Validar claves foráneas
                        const peliExiste = await dbSecundaria.Pelicula.findByPk(item.pelicula_id);
                        const fkCampo = camposClave.find(c => c !== 'pelicula_id');
                        const fkModelName = fkCampo.split('_')[0].charAt(0).toUpperCase() + fkCampo.split('_')[0].slice(1);
                        const fkExiste = await dbSecundaria[fkModelName]?.findByPk(item[fkCampo]);

                        if (peliExiste && fkExiste) {
                            await RelSecundaria.create(item);
                            console.log(`✅ Relación insertada: ${nombre} → ${JSON.stringify(whereCond)}`);
                        } else {
                            console.warn(`⚠️ Relación omitida por clave foránea inexistente: ${JSON.stringify(whereCond)}`);
                        }
                    }
                }
            } catch (errRelacion) {
                console.error(`❌ Error sincronizando relación ${nombre}:`, errRelacion);
            }
        }

        console.log('🎉 Sincronización completada.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error general:', err);
        process.exit(1);
    }
};

syncData();
