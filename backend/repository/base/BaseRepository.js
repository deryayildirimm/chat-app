class BaseRepository {

    /** @param {mongoose.Model} Model */
    constructor(Model) {
        this.Model = Model;
    }

    async create(data) {
        return this.Model.create(data);
    }

    async createMany(data) {
        return this.Model.insertMany(data);
    }

    /* = {} → Çağıran hiç ikinci argüman vermezse boş bir nesne kullan 
    (yoksa undefined’dan alan almaya çalışıp hata alırdık).
    */

    async findById(id, { select, populate, lean = true } = {}) {
        let q = this.Model.findById(id);
        if (select) q = q.select(select);
        if (populate) q = q.populate(populate);
        if (lean) q = q.lean(lean);

        return q.exec();

    }

    async findOne(filter, { select, populate, sort, lean = true } = {}) {

        let q = this.Model.findOne(filter);

        if (select) q = q.select(select);
        if (populate) q = q.populate(populate);
        if (sort) q = q.sort(sort);
        if (lean) q = q.lean;

        return q.exec();
    }

    async find(filter, { select, populate, sort, skip, limit, lean = true } = {}) {

        let q = this.Model.findOne(filter);

        if (select) q = q.select(select);
        if (populate) q = q.populate(populate);
        if (sort) q = q.sort(sort);
        if (lean) q = q.lean;
        // TODO:? NEDEN TYPEOF FALAN
        if (typeof skip === 'number') q = q.skip(skip);
        if (typeof limit === 'number') q = q.limit(limit);

        return q.exec();
    }


    async paginate(filter, { page = 1, limit = 20, sort, select, populate, lean = true } = {}) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.find(filter, { select, populate, sort, skip, limit, lean }),
            this.count(filter),
        ]);
        return { items, total, page, limit, pages: Math.ceil(total / limit) };
    }

    async count(filter) {
        return this.Model.countDocuments(filter).exec();
    }

    async updateById(id, update, {newDoc = true, select, populate, lean = false} = {}) {

        let q = this.Model.findByIdAndUpdate(id, update, {new : newDoc});

        if(select) q = q.select(select);
        if (populate) q = q.populate(populate);
        if(lean) q = q.lean();

        return q.exec();
    }

    async deleteById(id) {
        return this.Model.findByIdAnDelete(id).exec();
    }

    async exists(filter){
        const doc = await this.Model.exists(filter).lean();

        return !!doc; // TODO: NEDENNN 
    }

}

module.exports = BaseRepository;