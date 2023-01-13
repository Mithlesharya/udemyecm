class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // "i" mean when any user search then it'll be automatically covert into insensitivity or lowercase
            }
        } : {}
        // console.log(keyword)
        this.query = this.query.find({ ...keyword });
        return this;
    }


    // Filter product 

    filter() {
        const queryCopy = { ...this.queryStr };

        // remove some feilds from queryStr and we need only category
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(ele => { delete queryCopy[ele] });

        //  console.log(queryCopy)
        // advance product filter using price and ratings etc
        let queryStr =  JSON.stringify(queryCopy); // covert object to string
     

        //search using price eg: &price[gte]=1$price[lte]=200
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        

        this.query = this.query.find(JSON.parse(queryStr)); // now again covert string to object
        return this;

    }
}


export default ApiFeatures;
