export default {
    endpoints: {
        continents: "http://localhost:8082/continents",
        countries: "http://localhost:8082/countries",
        regions: "http://localhost:8082/regions"
    },
    cache: {
        continents: "http://localhost:8082/continents/cache",
        countries: "http://localhost:8082/countries/cache",
        regions: "http://localhost:8082/regions/cache"
    }
}