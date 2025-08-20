import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { motion, AnimatePresence } from 'framer-motion'
import moment from 'moment'
import RoleInfoHeader from './components/RoleInfoHeader'
import type { sessionType } from '../../utils/types'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import QuestionCard from '../../components/cards/QuestionCard'
import { LuCircleAlert } from 'react-icons/lu'
import AIResponsePreview from './components/AIResponsePreview'
import Drawer from '../../components/Drawer'
import { toast } from 'react-toastify'

const InterviewPrep = () => {
  const { sessionId } = useParams<string>()
  const [sessionData, setSessionData] = useState<sessionType>()
  const [error, setError] = useState('')
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false)
  const [explanation, setExplanation] = useState<{ title: string; explanation: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoader] = useState(false)

  const fetchSessionDetailById = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId!))
      setSessionData(data.session)
    } catch (err) {
      console.error(err)
    }
  }

  const generateConceptExplanation = async (question: string) => {
    try {
      setError('')
      setExplanation(null)
      setIsLoading(true)
      setOpenLeanMoreDrawer(true)

      const { data } = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, { question })
      if (data) setExplanation(data)
    } catch (err: any) {
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleQuestionPinStatus = async (questionId: string) => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))
      if (data?.questions) fetchSessionDetailById()
      toast.success('Pinned')
    } catch (err) {
      console.error(err)
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      const aiRes = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        description: sessionData?.description,
        topicToFocus: sessionData?.topicToFocus,
        numberOfQuestions: 10
      })

      const { data } = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: aiRes.data.data
      })

      if (data) {
        toast.success('Added more questions')
        fetchSessionDetailById()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (sessionId) fetchSessionDetailById()
  }, [sessionId])

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ''}
        topicToFocus={sessionData?.topicToFocus || ''}
        experience={Number(sessionData?.experience || 0)}
        questions={sessionData?.questions}
        description={sessionData?.description || ''}
        lastUpdated={
          sessionData?.updatedAt ? moment(sessionData.updatedAt).format('DD MMM YYYY') : ''
        }
      />

      <div className="container mx-auto px-4 md:px-0 py-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Interview Q&A</h2>

        <div className="grid grid-cols-12 gap-6">
          <div className={`col-span-12 ${openLeanMoreDrawer ? 'lg:col-span-7' : 'lg:col-span-8'}`}>
            {!sessionData ? (
              <p className="text-gray-500">Loading session...</p>
            ) : (
              <>
                <AnimatePresence>
                  {sessionData.questions?.map((q, idx) => (
                    <motion.div
                      key={q._id || idx}
                      layout
                      layoutId={`question-${q._id || idx}`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 100, delay: idx * 0.05 }}
                      className="mb-6"
                    >
                      <QuestionCard
                        question={q.question}
                        answer={q.answer}
                        openLearnMoreDrawer={() => generateConceptExplanation(q.question)}
                        isPinned={q.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(q._id)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {sessionData.questions?.length && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={uploadMoreQuestions}
                      disabled={isLoading || isUpdateLoader}
                      className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
                    >
                      Generate More Questions
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          title={!isLoading ? explanation?.title : ''}
        >
          {error && (
            <p className="flex items-center gap-2 text-red-600">
              <LuCircleAlert /> {error}
            </p>
          )}
          {!isLoading && explanation && <AIResponsePreview content={explanation.explanation} />}
        </Drawer>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep