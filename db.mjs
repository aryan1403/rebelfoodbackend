import mongoose from "mongoose";

async function testDB() {
    await mongoose.connect('mongodb://localhost:27017/test').then((res) => console.log(res));
    const userSchema = new mongoose.Schema({
        id: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            default: 0,
        }
    });
    const User = mongoose.model('user', userSchema);

    User.insertMany([
        {
            id: 'a',
            name: 'Aaryan',
        },
        {
            id: 'b',
            name: 'Arush'
        }
    ]);

    /* const myModel = mongoose.model('user', new Schema({
        name: 'Aaryan'
    }));

    const doc = new myModel(); */
    // console.log();
}

export async function SaveUserCreds(email, pass) {
    await mongoose.connect('mongodb://localhost:27017/test').then((res) => console.log(res));
    let uid = String(email).replace('@gmail.com', '');

    uid = uid.concat('@uid');
    // email : aaryan14032006@gmail.com
    // uid : aaryan14032006@uid
    console.log(uid);
    const userSchema = new mongoose.Schema({
        _id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        pass: {
            type: String,
            required: true,
        }
    });
    const User = mongoose.model('user', userSchema);
    await User.insertMany([{
        _id: uid,
        email: email,
        pass: pass,
    }]).then((res) => console.log(res));
}

export async function isLogin(email, pass) {
    let con = await mongoose.connect('mongodb://localhost:27017/test').then((res) => console.log(res));
    const id = email.replace('@gmail.com', '').concat('@uid');
    console.log(id);
    const userSchema = new mongoose.Schema({
        _id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        pass: {
            type: String,
            required: true,
        }
    });
    const User = mongoose.model('user', userSchema);
    let doc = await User.findById(id);
    console.log(doc);
    if(doc === null) {
        return {
            status: 404,
            msg: 'User not found with this Email',
        };
    }
    
    doc = doc.toJSON();

    console.log(email, pass);

    if(String(doc.email) === String(email) && String(doc.pass) === String(pass)) {
        return {
            status: 200,
            msg: 'Logged in Successfully',
        };
    } else {
        return {
            status: 500,
            msg: 'Password is Inorrect',
        };
    }
    mongoose.disconnect();

}