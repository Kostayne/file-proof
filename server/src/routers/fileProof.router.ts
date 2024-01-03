import { Router } from "express";
import { stringify } from 'json-bigint';

// services
import { FileProofService } from "../services/fileProof.service";

// utils
import { getRequestFile } from '../utils/getReqFile';

export const getFileProofRouter = (service: FileProofService) => {
    const router = Router();

    router.post('/submit', async (req, res) => {
        const owner = req.query.owner as string; {
            if (!owner) {
                return res.status(400).send('Set owner name!');
            }
        }

        const f = getRequestFile(req); {
            if (!f) {
                return res.status(400).send('Attach a file!');
            }
        }

        const receipt = await service.submit(f.data, owner);
        res.json(receipt);
    });

    router.post('/get', async (req, res) => {
        const f = getRequestFile(req); {
            if (!f) {
                return res.status(400).send('Attach a file!');
            }
        }

        const details = await service.get(f.data);
        const json = stringify(details);

        res.send(json);
    });

    return router;
};