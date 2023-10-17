import { btc_ethFunction } from '../../../utils/currency.js';
import logger from '../../../utils/logger.js';

export const etchoy = async (bot, chatUser) => {
    try {
        const { data, status, error } = await btc_ethFunction();

        if (error) {
            bot.sendMessage(chatUser.chatID, '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde');
            logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
            return false;
        }

        if (status !== 200) {
            bot.sendMessage(chatUser.chatID, '🤯 Hay problemas técnicos, volvé a intentarlo mas tarde');
            logger.error(`[TELEGRAM BOT]: la funcion "btc_ethFunction" del modulo "etchoy" devolvio un status code diferente a 200`);
            return false;
        }

        const valores = [
            data.eth.letsbit.ask,
            data.eth.fiwind.ask,
            data.eth.tiendacrypto.ask,
            data.eth.calypso.ask,
            data.eth.bitsoalpha.ask
        ];
        const sumaValores = valores.reduce((acumulador, valores) => acumulador + valores, 0);
        const promedio = sumaValores / valores.length;

        const msg = `
          <b>Etherium 💹</b>
          <b></b>
          <code> Exchange     Precio </code>
          <code> ------------------------</code>
          <code> Letsbit        u$${valores[0].toFixed(2)} </code>
          <code> Fiwind         u$${valores[1].toFixed(2)} </code>
          <code> Tiendacrypto   u$${valores[2].toFixed(2)} </code>
          <code> Calypso        u$${valores[3].toFixed(2)} </code>
          <code> Bitsoalpha     u$${valores[4].toFixed(2)} </code>
          <code> ------------------------</code>
          <code> Promedio       u$${promedio.toFixed(2)} </code>
          <b></b>
          `;

        bot.sendMessage(chatUser.chatID, msg, { parse_mode: "HTML" });
        return true;
    } catch (error) {
        logger.error(`[TELEGRAM BOT]: ${error.name}: ${error.message}. ${error.stack}`);
        return false;
    }
};