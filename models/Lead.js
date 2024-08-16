const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  email: {
    type: String,
    required: [false, 'Please provide email']
  },
  number: {
    type: String,
    required: [false, 'Please provide number']
  },
  salary: {
    type: Number,
    required: [false, 'Please provide salary']
  },
  address: {
    type: String,
    required: [false, 'Please provide address']
  },
  timeToReach: {
    type: String,
    required: [false, 'Please provide time for when we can reach you']
  },
  reachBy: {
    type: String,
    enum: ['email', 'phone'],
    required: [false, 'Please provide how we can reach you']
  },
  companyName: {
    type: String,
  },
  message: {
    type: String,
    required:true
  },
  leadType: {
    type: String,
    enum: ['creditcard', 'personalloan', 'microloan', 'businessloan', 'homeloan','insurance','cowork'],
    required: [true, 'Please provide type of lead']
  },
  documents: {
    type: Object,
  }
  //  // Personal Loan fields
  //  pancard: {
  //   type: String,
  // },
  // aadharcard: {
  //   type: String,
  // },
  // salaryslip: {
  //   type: String,
  // },
  // companyid: {
  //   type: String,
  // },
  // passportSizePhoto: {
  //   type: String,
  // },
  // offerLetter: {
  //   type: String,
  // },
  // bankStatement: {
  //   type: String,
  // },

  // // Business Loan fields
  // companyPancard: {
  //   type: String,
  // },
  // companyBankStatement: {
  //   type: String,
  // },
  // ITR: {
  //   type: String,
  // },
  // companyAddressProof: {
  //   type: String,
  // }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
