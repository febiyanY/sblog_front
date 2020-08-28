import React, { useCallback, useEffect, useState } from 'react'
import { Table, Row, Col, Button, Form, Input, FormGroup, Label } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userOperations } from '../state/ducks/users'
import { uiOperations } from '../state/ducks/ui'
import UserRow from './user/UserRow'
import Modal from '../components/Modal'
import axios from '../axioses/axios-default'

const Users = props => {
    const dispatch = useDispatch()
    const { error, users } = useSelector(state => state.users)
    const [modal, setModal] = useState({ title: 'Add User', confirmText: 'Yes', cancelText: 'Cancel', show: false })
    const [mode, setMode] = useState('add')
    const [form, setForm] = useState({ username: '', display_name: '', password : '', confirm_password : '' })
    const [formError, setFormError] = useState(null)
    const [selectedUser, setSelectedUser] = useState('')
    const [editPass, setEditPass] = useState(false)

    useEffect(() => {
        dispatch(userOperations.onLoadUsers())
    }, [dispatch])

    const addUser = () => {
        setMode('add')
        setEditPass(true)
        setForm(() => ({ username: '', display_name: '', password : '', confirm_password : '' }))
        setFormError(null)
        setModal(() => ({ title: 'Add User', confirmText: 'Yes', cancelText: 'Cancel', show: true }))
    }

    const editUser = useCallback((user) => {
        setMode('edit')
        setEditPass(false)
        setFormError(null)
        setSelectedUser(user.id)
        setForm(() => ({ username: user.username, display_name: user.display_name, password : '', confirm_password : '' }))
        setModal(() => ({ title: 'Edit User', confirmText: 'Save', cancelText: 'Cancel', show: true }))
    }, [])

    const deleteUser = useCallback((id) => {
        setMode('delete')
        setSelectedUser(id)
        setModal(() => ({ title: 'Confirmation', confirmText: 'Yes', cancelText: 'No', show: true }))
    },[])

    const closeModal = useCallback(() => setModal(() => ({ ...modal, show: false })), [modal])
    const onFormSubmit = (e) => { 
        e.preventDefault()
        // handleUserActions() 
    }

    const handleInputChange = useCallback((e) => {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm(() => ({
            ...form, [name]: value
        }))
    }, [form])

    const validateForm = useCallback(() => {
        let formData = {...form}
        let inv = 0
        if(!editPass){
            delete formData.password   
            delete formData.confirm_password   
        }
        for(let key in formData){
            if(formData[key]===null || formData[key].trim()==='') inv+=1
        }
        setFormError('Form is incomplete')
        return inv === 0
    },[editPass, form])

    const handleUserActions = useCallback(() => {
        let suffix=''
        let data
        let method
        if(mode==='add'){
            if(!validateForm()) return
            if(form.password!==form.confirm_password) return setFormError('Password did not match')
            method = 'POST'
            data = {...form, type : 'client'}
            delete data.confirm_password
        }else if(mode==='delete'){
            method = 'DELETE'
            suffix='/'+ selectedUser
        }else if(mode==='edit'){
            if(!validateForm()) return
            method = 'PATCH'
            let updateData = {...form}
            delete updateData.confirm_password
            if(editPass){
                if(form.password!==form.confirm_password) return setFormError('Password did not match')
                data = {userId : selectedUser, update : {...updateData}}
            }else{
                delete updateData.password
                data = {userId : selectedUser, update : {...updateData}}
            }
            method = 'PATCH'
        }
        dispatch(uiOperations.showLoader())
        axios({
            url : '/users'+suffix,
            method,
            data,
            headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}
        }).then(res => {
            dispatch(userOperations.onLoadUsers())
            setModal(() => ({ ...modal, show: false }))
            dispatch(uiOperations.hideLoader())
        }).catch(err => {
            if(err.response.data.name==='SequelizeUniqueConstraintError'){
                setFormError('Username exist')
            }
            console.log(err.response.data)
            dispatch(uiOperations.hideLoader())
        })
    },[dispatch, modal, mode, form, selectedUser, editPass, validateForm])

    const toggleEditPass = () => {
        setEditPass(() => !editPass)
    }

    return (
        <div style={{ marginTop: '2%' }}>
            <h4>Users</h4>
            <Button color="primary" size="sm" onClick={addUser}>Add User</Button>
            {!error ? <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Display Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return <UserRow key={i} index={i} user={user} onEdit={editUser} onDelete={deleteUser} />
                    })}
                </tbody>
            </Table> : error.message}

            <Modal toggle={closeModal} confirm={handleUserActions} show={modal.show} confirmText={modal.confirmText} cancelText={modal.cancelText} title={modal.title}>
                {mode === 'delete' ? 'Are you sure you want to delete this user ?' :
                    <Form onSubmit={onFormSubmit}>
                        {formError ? 'ERROR : ' + formError : ''}
                        <FormGroup>
                            <Label>Username</Label>
                            <Input type="text" name="username" value={form.username} onChange={handleInputChange} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Display Name</Label>
                            <Input type="text" name="display_name" value={form.display_name} onChange={handleInputChange} required/>
                        </FormGroup>
                        {mode==='edit' ? <Button color="primary" size="sm" onClick={toggleEditPass}>Edit Password</Button> : null}
                        {editPass ?<div><FormGroup>
                            <Label>Password</Label>
                            <Input type="password" name="password" value={form.password} onChange={handleInputChange} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <Input type="password" name="confirm_password" value={form.confirm_password} onChange={handleInputChange} required/>
                        </FormGroup></div> : null}
                    </Form>}


            </Modal>

        </div>

    )
}

export default Users