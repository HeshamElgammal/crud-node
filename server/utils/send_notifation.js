const admin = require("firebase-admin");

// c9UqBgI6B0Cwpd8u6jEGqE:APA91bFr09VIjBC-otRzTmnMpbzw1BbscXbBXH8gwTzlp8O_22sY32PsYIFYjO4NTVf2JzEdmzEHZg4CwJoUXtl1x8fdHkeukexLPevT6H1J3OU7HuND3CAlhCiKowxRzqSDPtkL4_ir
const token=`c9UqBgI6B0Cwpd8u6jEGqE:APA91bFr09VIjBC-otRzTmnMpbzw1BbscXbBXH8gwTzlp8O_22sY32PsYIFYjO4NTVf2JzEdmzEHZg4CwJoUXtl1x8fdHkeukexLPevT6H1J3OU7HuND3CAlhCiKowxRzqSDPtkL4_ir`;
const serviceAccount = require("./trynity_firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification=async(req,res)=>{
    try {
        const { title, body,  } = req.body;
        await admin.messaging().send({
            // tokens:[],
            token,
            notification: {
                title,
                body,
            },
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
}

exports.sendNotification=sendNotification

