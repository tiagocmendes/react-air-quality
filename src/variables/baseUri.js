export default {
    endpoints: {
        continents: "http://localhost:8082/continents",
        countries: "http://localhost:8082/countries",
        regions: "http://localhost:8082/regions",
        currentLocation: "http://localhost:8082/here"
    },
    cache: {
        regions: "http://localhost:8082/regions/cache"
    }
}