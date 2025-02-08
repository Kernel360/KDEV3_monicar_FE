'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { RoundButton } from '@/components/common/Button/RoundButton'
import SignInInput from '@/components/common/Input/SignInInput'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import { useModal } from '@/hooks/useModal'
import { authService } from '@/lib/apis/auth'
import { validateEmail, validatePassword } from '@/lib/utils/validation'

import * as styles from './styles.css'

interface FormDataModel {
    email: string
    loginId: string
    nickname: string
    password: string
}

const SignUpPage = () => {
    const [formData, setFormData] = useState<FormDataModel>({
        email: '',
        loginId: '',
        nickname: '',
        password: '',
    })

    const { isModalOpen, message, closeModal, openModalWithMessage } = useModal()

    const router = useRouter()

    const validateFormData = (formData: FormDataModel) => {
        const emailValidation = validateEmail(formData.loginId)
        const passwordValidation = validatePassword(formData.password)

        if (!emailValidation.isValid) {
            openModalWithMessage(emailValidation.message!)
            return { isValid: false }
        }

        if (!passwordValidation.isValid) {
            openModalWithMessage(passwordValidation.message!)
            return { isValid: false }
        }

        return { isValid: true }
    }

    const handleSubmit = async () => {
        const validate = validateFormData(formData)
        if (!validate.isValid) return

        const isSignUp = await authService.postSignUp(
            formData.email,
            formData.nickname,
            formData.loginId,
            formData.password,
        )

        if (!isSignUp.isSuccess) {
            openModalWithMessage(isSignUp.message)
            return
        }

        router.push('/signin')
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Kernel360 3기 내부 테스트를 위한 임시 회원가입</h1>
            <div className={styles.form}>
                <SignInInput
                    icon='/icons/sign-in-user-icon.svg'
                    placeholder='이메일을 입력해주세요'
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    onSubmit={handleSubmit}
                />
                <SignInInput
                    icon='/icons/sign-in-user-icon.svg'
                    placeholder='닉네임을 입력해주세요'
                    value={formData.nickname}
                    onChange={(event) => setFormData({ ...formData, nickname: event.target.value })}
                    onSubmit={handleSubmit}
                />
                <SignInInput
                    icon='/icons/sign-in-user-icon.svg'
                    placeholder='아이디를 입력해주세요'
                    value={formData.loginId}
                    onChange={(event) => setFormData({ ...formData, loginId: event.target.value })}
                    onSubmit={handleSubmit}
                />
                <SignInInput
                    icon='/icons/sign-in-lock-icon.svg'
                    type='password'
                    placeholder='비밀번호를 입력해주세요'
                    value={formData.password}
                    onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                    onSubmit={handleSubmit}
                />
                <div className={styles.buttonWrapper}>
                    <RoundButton size='large' color='primary' onClick={handleSubmit}>
                        임시 회원가입
                    </RoundButton>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                message={message as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeModal}
            />
        </div>
    )
}

export default SignUpPage
