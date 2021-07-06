const mongoose = requre("mongoose");

const schema = mongoose.Schema({
    name: String,
    body: String,
    thread_id: Boolean,
    date: Date
})

