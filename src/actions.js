import { firebaseApp } from './firebase'
import * as firebase  from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

//le indico que quiero obtener la collecion de forma asíncrona de tasks en firebase
export const getCollection = async(collection) => {
    const result = { 
        statusResponse : false,
        data : null,
        error : null
    }

    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({id: doc.id,...doc.data()}))
        result.statusResponse = true
        result.data = arrayData
        // console.log(arrayData)
    } catch (error) {
        result.error = error
    }

    return result
}


//Añadir una nueva tarea
export const addDocument = async(collection,data) => {
    const result = { 
        statusResponse : false,
        data : null,
        error : null
    }
    try {
        const response = await db.collection(collection).add(data)
        result.data = {id: response.id}
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}


//Manera de obetner un documento de la base de datos firebase.
export const getDocument = async(collection, id) => {
    const result = { 
        statusResponse : false,
        data : null,
        error : null
    }

    try {
        //De esta manera obtenemos un documento
        const response = await db.collection(collection).doc(id).get()
        result.data = {id: response.id, ...response.data()}
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

//actualizando una tarea de la base de datos Firebase
export const updateDocument = async(collection, id, data) => {
    const result = { 
        statusResponse : false,
        error : null
    }

    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

//elimiando una tarea de la base de datos Firebase
export const deleteDocument = async(collection, id) => {
    const result = { 
        statusResponse : false,
        error : null
    }

    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}
