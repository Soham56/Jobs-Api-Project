const Jobs = require('../models/job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError,NotFound} = require('../errors')

const getAlljobs = async (req,res)=>{
    const jobs = await Jobs.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs,count:jobs.length});
}

const createJob = async (req, res)=>{
    req.body.createdBy = req.user.userId;
    const job = await Jobs.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}


const getJob = async (req, res)=>{
    const {user: {userId}, params: {id:jobId}} = req;
    const job = await Jobs.findOne({createdBy: userId, _id:jobId});
    res.status(StatusCodes.OK).json({job});
}


const updateJob = async (req, res)=>{
    const {user: {userId}, params: {id:jobId}, body:{company,position,status}} = req;
    
    if(company==="" || position===""){
        throw new BadRequestError('Please provide comapany and position');
    }

    const job = await Jobs.findOneAndUpdate({createdBy:userId, _id:jobId}, {company, position, status});
    if(!job){
        throw new NotFound(`No job found with id ${jobId}`);
    }
    res.status(StatusCodes.CREATED).json({job});
}

const deleteJob = async (req, res)=>{
    const {user: {userId}, params:{id:jobId}} = req;
    const job = await Jobs.findOneAndRemove({createdBy: userId, _id: jobId});
    if(!job){
        throw new NotFound(`No job found with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send("Successfully Deleted");
}

module.exports = {
    getAlljobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}