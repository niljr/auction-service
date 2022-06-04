import { closeAuction } from '../lib/closeAuction';
import { getEndedAuctions } from '../lib/getEndedAuctions';
import createError from 'http-errors';

async function processAuctions(event, context) {
    try {
        const auctionstoClose = await getEndedAuctions();
        const closePromises = auctionstoClose.map(auction => closeAuction(auction));
        await Promise.all(closePromises);
        return { close: closePromises.length };
    } catch (error) {
        console.error(error);
        throw new createError.InternalServerError(error);
    }
}


export const handler = processAuctions;