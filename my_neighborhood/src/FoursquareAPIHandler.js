

const clientId = "VD1GIENPFBNJMCM5CGYHSDMRYEGFSNXTYJJ2HUIKJZLGVD1D"

const clientSecret = "TULWF4RFUGOGHORI4KTQ32KKHVXYHOXFHAU11VWOYQ1RYVAL"

const v = "20181005"


export const getCategory = (categories, cantPerCategory, LatLng) => {
    let promises = []
    categories.map(function (category) {
        return promises.push(fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&v=${v}&limit=${cantPerCategory}&ll=${LatLng}&query=${category}`, {'Accept': 'application/json'})
        .then(res => res.json())
        .then(data => data.response))
    })
    return Promise.all(promises).then(values => values)
}

export const getVenueInfo = (venue) => {
    return fetch(`https://api.foursquare.com/v2/venues/${venue}?client_id=${clientId}&client_secret=${clientSecret}&v=${v}`, {'Accept': 'application/json'})
    .then((response) => (response.json()))
    .then((data) => (data.response))
}
