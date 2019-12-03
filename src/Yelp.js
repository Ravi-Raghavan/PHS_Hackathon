const apiKEY = 'stLKpaCsKjy37WhBJhdXuU0rM9XU5iV3RP0mqx1TO1gwvAUx3LDnw9OLD_l-PlDXE_sw5XkYRgY_e-c4NKd1KcX_CohLyWLbSmzA2S3dB2ozFlo_ePGBwzlLIcajXXYx'

const Yelp = {
    search(categories, location, sortBy){
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=${categories}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKEY}`
            }
        }).then(response => {return response.json()}).then(jsonResponse => {
            if(jsonResponse.total > 0){
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    url: business.url,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count,
                    longitude: business.coordinates.longitude,
                    latitude: business.coordinates.latitude
                }))
            }
        })
    }
}
export default Yelp;