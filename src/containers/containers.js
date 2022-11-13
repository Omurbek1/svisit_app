import { connect } from 'react-redux'

import { signIn, updateData, quit } from '../store/actions';

import { System } from '../pages/Dashboard';
import { LoginForm } from '../components/Login';
import { Table } from '../components/Dashboard/Dasboardtable';
import { Header } from '../components/layout/Header';

export const SystemContainer = connect(
  state => ({
    user: state.user
  }),
  dispatch => ({
    async getItems(params) {
      // console.log('Get Items', params)
      // dispatch(getItems(params))
    },
    async getNextItems(params) {
      // console.log('Get Items', params)
      // dispatch(getNextItems(params))
    }
  })
)(System)

export const TableContainer = connect(
  state => ({
    items: state.system.table.items
  }),
  dispatch => ({
    onUpdateData(data) {
      dispatch(updateData(data))
    }
  })
)(Table)

export const HeaderContainer = connect(
  state => ({
    isSignedIn: state.user.username && state.user.password
  }),
  dispatch => ({
    onQuit() {
      dispatch(quit())
    }
  })
)(Header)

export const AuthFormContainer = connect(
  (state, props) => 
    ({
      user: state.user
    }) 
  ,
  dispatch => ({
    async onSignIn(data) {
      const res = await dispatch(signIn(data))
      return res
    }
  })
)(LoginForm)