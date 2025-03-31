import { config } from "dotenv";
config();

let accessToken: string;
let tokenExpiryTime: number;

async function refreshToken() {
    try {
        const url = new URL("https://osu.ppy.sh/oauth/token");

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        };

        let body = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_KEY}&grant_type=client_credentials&scope=public`;

        const tokenResponse = await fetch(url, {
            method: "POST",
            headers,
            body,
        });

        const { access_token, expires_in } = await tokenResponse.json();
        accessToken = access_token;
        tokenExpiryTime = Date.now() + expires_in * 1000;

        return access_token;
    } catch (error: any) {
        console.error(
            "Error refreshing token:",
            error.response ? error.response.data : error.message,
        );
        throw new Error("Error refreshing Token:" + error);
    }
}

export async function getAccessToken() {
    if (!accessToken || (tokenExpiryTime && Date.now() >= tokenExpiryTime)) {
        return await refreshToken();
    }
    return accessToken;
}
