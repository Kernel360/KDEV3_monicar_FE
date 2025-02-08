'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ColorRing } from 'react-loader-spinner'

import { RoundButton } from '@/components/common/Button/RoundButton'
import SignInInput from '@/components/common/Input/SignInInput'
import Modal from '@/components/common/Modal'
import { ModalMessageType } from '@/components/common/Modal/types'
import { useAuth } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'
import { validateEmail, validatePassword } from '@/lib/utils/validation'
import { useAuthStore } from '@/stores/useAuthStore'

import * as styles from './styles.css'

interface FormDataModel {
    email: string
    password: string
}

const SignInPage = () => {
    const [formData, setFormData] = useState<FormDataModel>({
        email: '',
        password: '',
    })
    // const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const { isModalOpen, message, closeModal, openModalWithMessage } = useModal()
    const { isAuthLoading, authError } = useAuthStore()

    const router = useRouter()

    const validateFormData = (formData: FormDataModel) => {
        const emailValidation = validateEmail(formData.email)
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

        await login(formData.email, formData.password)

        if (authError) {
            switch (authError) {
                case 'INVALID_CREDENTIALS':
                    openModalWithMessage('아이디 또는 비밀번호가 일치하지 않습니다')
                    break
                case 'SERVICE_ERROR':
                    openModalWithMessage('일시적인 오류가 발생했습니다\n잠시 후에 다시 시도해주세요')
                    break
                default:
                    openModalWithMessage('서비스 이용에 불편을 드려 죄송합니다\n잠시 후에 다시 시도해주세요')
                    break
            }
            return
        }

        // login(formData.email)
        router.push('/dashboard')
    }

    return (
        <div className={styles.container}>
            <section className={styles.introSection}>
                <p className={styles.introduceMessage}>
                    실시간 지도 기반의 <br />
                    차량 관제 서비스를 경험해 보세요
                </p>
                <Image src={'/images/sign-in-map.png'} width={550} height={550} alt='지도' />
            </section>

            <section className={styles.signInSection}>
                <div className={styles.signInHeader}>
                    <Image src={'/logo.png'} width={180} height={120} alt='박스로고' />
                    <Image src={'/white-text-logo.png'} width={180} height={40} alt='텍스트로고' />
                </div>

                <div className={styles.signInForm}>
                    <SignInInput
                        icon='/icons/sign-in-user-icon.svg'
                        placeholder='아이디를 입력해주세요'
                        value={formData.email}
                        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
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
                        <RoundButton
                            size='large'
                            color='secondary'
                            className={styles.resetButton}
                            onClick={handleSubmit}
                            disabled={isAuthLoading}
                        >
                            {isAuthLoading ? (
                                <ColorRing
                                    visible={true}
                                    height='40'
                                    width='40'
                                    ariaLabel='color-ring-loading'
                                    wrapperStyle={{}}
                                    wrapperClass='color-ring-wrapper'
                                    colors={['#ff385c', '#cf6b81', '#fdced4', '#00b087', '#ed9684']}
                                />
                            ) : (
                                '로그인'
                            )}
                        </RoundButton>
                    </div>

                    <p className={styles.helpText}>
                        비밀번호를 잊으셨나요?<strong className={styles.emphasis}>관리자에게 문의해주세요</strong>
                    </p>
                </div>
            </section>

            <Modal
                isOpen={isModalOpen}
                message={message as ModalMessageType}
                variant={{ variant: 'alert', confirmButton: '확인' }}
                onClose={closeModal}
            />
        </div>
    )
}

export default SignInPage
