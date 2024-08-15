/// <reference path = "jquery-3.7.1.js" />
"use strict";

export async function apiCall(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log('Error fetching data:', err);
       
    }
}
