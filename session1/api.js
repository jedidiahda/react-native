import moment from 'moment';

import Constants from 'expo-constants';

const url = 'https://my-json-server.typicode.com/alvinnynoona02/demo/events';

export function formatDate(dateString) {
    const parsed = moment(new Date(dateString));
    if (!parsed.isValid()) {
        return dateString;
    }
    return parsed.format('D MMM YYYY');
}

export function getEvents() {
    return fetch(url)
        .then(response => response.json())
        .then(events => events.map(s => ({
            ...events,
            date: new Date(e.date)
        })))
}

export function saveEvent({ title, date }) {
    var RandomNumber = Math.floor(Math.random() + 10000) + 1;
    return fetch(url, {
        method: 'post',
        body: JSON.stringify({
            title,
            date,
            id: RandomNumber
        }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .catch(err => console.log('Error', err))
}

export function getCountdownParts(eventDate) {
    const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
    return {
        days: parseInt(duration.as('days')),
        hours: duration.get('hours'),
        minutes: duration.get('minutes'),
        seconds: duration.get('seconds')
    }
}