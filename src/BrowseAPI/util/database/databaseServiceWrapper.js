'use strict'

var service = require('./databaseServices')
var ObjectID = require('mongodb').ObjectID;



/* =======================================================RUN QUERIES================================================ */
exports.insertRun = async function insertRun(run) {
    try {

        return (await service.mongodbInsert('runsCollection', run));
    } catch (error) {
        throw (error)
    }
}

exports.updateRuns = async function updateRuns(runId, updatedRun) {
    var updatedRunObject = {
        $set: updatedRun
    }
    var queryObject = {
        id: runId
    }
    try {
        return (await service.mongodbUpdate('runsCollection', queryObject, updatedRunObject));
    } catch (error) {
        console.log(error);
        throw (error);
    }
}

exports.deleteRun = async function deleteRun(run) {
    try {
        return (await service.mongodbDelete('runsCollection', run));
    } catch (error) {
        throw (error);
    }
}

exports.queryRun = async function queryRun(query) {
    var queryObject = {}
    // if (query.hasOwnProperty('tags')) {
    //     for (var i = 0, n = query['tags'].length; i < n; i++) {
    //         queryObject['tags.' + query['tags'][i]] = { $exists: true };
    //     }
    // }

    if (query.hasOwnProperty('date')) {
        queryObject['date'] = query['date'];
    }

    if (query.hasOwnProperty('time')) {
        queryObject['time'] = query['time'];
    }

    console.log(queryObject);

    try {
        return (await service.mongodbQuery('runsCollection', queryObject, ['id', 'time', 'date', 'tags']));
    } catch (error) {
        throw (error);
    }
}

exports.getRun = async function getRun(runId) {
    var queryObject = {
        id: runId
    }
    try {
        return (await service.mongodbQuery('runsCollection', queryObject));
    } catch (error) {

    }
}

exports.filterIds = async function filterIds(ids) {
    var queryObject = {
        id: {
            $in: ids
        }
    };
    try {
        return (await service.mongodbQuery('runsCollection', queryObject, ['id']))
    } catch (error) {
        throw (error);
    }
}
/* =================================================================================================================== */




/* ====================================================AUTHENTICATE QUERIES=========================================== */
exports.getAuthentication = async function getAuthentication() {

}

exports.setAuthentication = async function setAuthentication(authentication) {
    try {
        return (await service.mongodbInsert('authenticationCollection', authentication));
    } catch (error) {
        throw (error)
    }
}

exports.updateAuthentication = async function updateAuthentication(authentication) {
    var authenticationObject = {
        $set: authentication
    }

    var queryObject = {
        profileID : authentication.profileID
    }

    try {
        return (await service.mongodbUpdate('authenticationCollection', queryObject, authenticationObject));
    } catch (error) {

    }
}

exports.getOneDriveAuthentication = async function getOneDriveAuthentication(profileID) {
    try {
        var query = {
            profileID: profileID
        }
        return (await service.mongodbQuery('authenticationCollection', query));
    } catch (error) {

    }
}

/* =================================================================================================================== */

/* ====================================================TAG QUERIES==================================================== */
exports.getTag = async function getTag(tag) {
    var query = {};

    query['tag'] = tag;

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.getTagById = async function getTagById(tagId) {
    var query = {};
    query['_id'] = tagId;

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.queryTag = async function queryTag(tag) {
    var query = {};
    query['tag'] = {
        $regex: '^' + tag,
        $options: 'i'
    };

    try {
        return (await service.mongodbQuery('tagsCollection', query, undefined));
    } catch (error) {
        throw (error);
    }
}

exports.addTag = async function addTag(tag) {
    try {
        var tagObject = {
            tag: tag
        }
        return (await service.mongodbInsert('tagsCollection', tagObject))

    } catch (error) {
        throw (error);
    }
}

exports.deleteTagbyId = async function deleteTag(componentId, tagId) {
    try {
        var query = { id: componentId };

        var deletion = { $unset: {} };
        deletion['$unset']['tags.' + tagId] = 1;

        return (await service.mongodbUpdate('runsCollection', query, deletion));
    } catch (error) {

    }
}

/* =======================================================Annotations QUERIES=========================================== */
exports.deleteAnnotation = async function deleteAnnotation(componentId, annotationId) {
    try {

        var query = { id: componentId }

        var deletion = { $unset: {} };
        deletion['$unset']['annotations.' + annotationId] = 1;


        return (await service.mongodbUpdate('runsCollection', query, deletion))
    } catch (error) {
        throw (error);
    }
}



/* =======================================================ALGORITHM QUERIES=========================================== */

exports.insertAlgorithm = async function insertAlgorithm(algorithm) {
    try {
        return (await service.mongodbInsert('algorithmsCollection', algorithm));
    } catch (error) {
        throw (error);
    }
}

exports.getAllAlgorithms = async function getAllAlgorithms() {
    try {
        return (await service.mongodbFindAll('algorithmsCollection', undefined));
    } catch (error) {
        throw (error);
    }
}

exports.getAlgorithm = async function getAlgorithm(id) {
    var query = {
        _id: new ObjectID(id)
    }
    try {
        return ((await service.mongodbQuery('algorithmsCollection', query, undefined))[0]);
    } catch (error) {
        throw (error);
    }
}

exports.getDefaultAlgorithm = async function getDefaultAlgorithm() {
    var query = {
        name: 'default'
    }

    try {
        return ((await service.mongodbQuery('algorithmsCollection', query, undefined))[0]);
    } catch (error) {
        throw (error);
    }
}

/* ========================================================================================================= */