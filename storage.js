// WebAppStorage — Telegram Cloud Storage

const tg = window.Telegram.WebApp;

export async function loadData() {
    return new Promise(resolve => {
        tg.CloudStorage.getItem("payments_data", (err, value) => {
            if (err || !value) {
                resolve({
                    settings: {},
                    payments: [],
                    history: []
                });
            } else {
                resolve(JSON.parse(value));
            }
        });
    });
}

export async function saveData(data) {
    return new Promise(resolve => {
        tg.CloudStorage.setItem("payments_data", JSON.stringify(data), () => {
            resolve(true);
        });
    });
}
