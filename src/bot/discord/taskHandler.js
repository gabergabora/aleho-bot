import { newFreeGamesFunction } from '../../utils/games.js';
import logger from '../../utils/logger.js';
import { EmbedBuilder } from 'discord.js';

const taskHandler = async (hook) => {
    searchNewGames(hook);
};

const searchNewGames = async (hook) => {
    const { data, status, error } = await newFreeGamesFunction('TokonBot');
    const validData = !error && status === 200 && data.length !== 0;

    if (validData) {
        await Promise.all(data.map(game => {
            let msg = `${game.title}:\n\n Tipo: ${game.type}\n Plataforma: ${game.platforms}\n Finaliza: ${game.end_date}\n ${game.open_giveaway_url}`;
            let embed = (new EmbedBuilder().setTitle(msg).setColor(0x00FFFF).setImage(game.thumbnail));
            hook.send({
                content: 'Juego Gratis encontrado:',
                username: 'TokonBot',
                embeds: [embed],
            });
            logger.info(`[DISCORD BOT]: Juego gratis encontrado, TokonBot informado.`);
        }));
    }
};

export default taskHandler;