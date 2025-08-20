import { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'

import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { toast } from 'react-toastify'


interface FormDatatype {
    role: string,
    experience: string,
    topicToFocus: string,
    description: string,
}

const CreateSessionForm = () => {
    const [formData, setFormData] = useState<FormDatatype>({
        role: "",
        experience:"",
        topicToFocus: "",
        description: "",

    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    


    const navigate = useNavigate()

    const handleChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value
        }))
    }

    const handleCreateSession = async (e: React.FormEvent) => {
        e.preventDefault()
        const { role, experience, topicToFocus } = formData

        if (!role || !experience || !topicToFocus) {
            setError("Please enter all fields")
            return; 
        }
        setError("")
        setIsLoading(true)


        try {
            const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
                role, experience, topicToFocus, numberOfQuestions: 10,


            }
            )
            console.log(aiResponse)
            if (aiResponse.status === 304) {
                setError("AI questions not refreshed. Please try again later.");
                return;
            }

            


            // if (!Array.isArray(aiResponse.data)) {
            //     setError("Failed to generate questions. Please try again.");
            //     return;
            // }
            const generatedQuestions = aiResponse.data.data

            const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
                ...formData, questions: generatedQuestions
            })
            console.log(response)
            if (response.data?.session?._id) {
                toast.success("session created")
                navigate(`/interview-prep/${response.data?.session?._id}`)
            }
            else {
                toast.warning("session not created")
                navigate("/dashboard")
            }
        } catch (error: any) {
            console.log(error)
            console.error(error)
            setError(error)
            if (error.response && error.response.message) {

                setError(error.response.data.message)
                toast.error(error)
            }
            else {
                setError("something went wrong")
                toast.error(error)

            }
            return error
        }

        finally {
            setIsLoading(false)
        }
    }

    

    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
            <h3 className="text-lg font-smeibold text-black">Start a new new Interview Journey</h3>

            <p className='text-xs text-slate-700 mt-[4px] mb-3'>Fill out a few quick details and unlock your personalized set of interview questions!</p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label='Target Role'
                    type='text'
                    placeholder='(e.g., frontend Developer, UI/UX Designer, etc.)'
                />
                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience",target.value)}
                    label='Years of Experience'
                    type='number'
                    placeholder='(e.g., 1 year, 3 years)'
                />
                <Input
                    value={formData.topicToFocus}
                    onChange={({ target }) => handleChange("topicToFocus", target.value)}
                    label='Topics to Focus On'
                    type='text'
                    placeholder='(e.g., react, node js, mongodb, etc.)'

                />
                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label='Description'
                    type='text'
                    placeholder='(Any speicifc goals or notes for this session)'

                />

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button type='submit' className='btn-primary' disabled={isLoading}>
                    {isLoading ? <p>Creating a session ...</p> : <p>Create Session</p>}
                </button>


            </form>

        </div>
    )
}

export default CreateSessionForm