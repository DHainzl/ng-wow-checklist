import { NowRequest, NowResponse } from '@now/node';

module.exports = (req: NowRequest, res: NowResponse) => {
    res.json({
        success: true,
        result: 'it works!',
    });
};
