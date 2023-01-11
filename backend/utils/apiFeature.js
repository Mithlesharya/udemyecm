class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options : 'i' // "i" mean when any user search then it'll be automatically covert into insensitivity or lowercase
            }
        } : {}
        console.log(keyword)
        this.query = this.query.find({...keyword});
        return this;
    }
}


export default ApiFeatures;
