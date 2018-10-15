const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      emailIsConfirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emailConfirmationCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailIsConfirmedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      resetCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      tableName: 'users',
    })
  }

  async setPassword(password) {
    const hash = await bcrypt.hash(password, 10)

    this.password = hash
  }

  async comparePassword(password) {
    if (! this.password) {
      return false
    }

    return await bcrypt.compare(password, this.password)
  }

  generateJWT() {
    return jwt.sign({
      id: this.id,
      email: this.email,
    }, process.env.SESSION_SECRET)
  }

  setConfirmationCode() {
    const emailConfirmationCode = crypto.randomBytes(64).toString('hex')

    this.emailConfirmationCode = emailConfirmationCode

    return emailConfirmationCode
  }

  setResetCode() {
    const resetCode = crypto.randomBytes(64).toString('hex')

    this.resetCode = resetCode

    return resetCode
  }

  updateSignInCount() {
    this.signInCount++
    this.save()
  }
}

module.exports = User
