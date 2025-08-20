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
  const [error, setError] = useState("")

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState<boolean>(false)

  const [explanation, setExplanation] = useState<{
    title: string, explanation: string
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const [isUpdateLoader] = useState(false)

  const fetchSessionDetailById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId!))

      console.log(response.data.session)
      setSessionData(response.data.session)
      // toast.success("session data fetched")

    } catch (error) {
      console.log(error)
      return error;
    }
  }

  const generateConceptExplanation = async (question: string) => {
    try {
      setError("")
      setExplanation(null)
      setIsLoading(true)
      setOpenLeanMoreDrawer(true)

      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question,
      })

      if (response.data) { setExplanation(response.data) }

    } catch (error: any) {
      console.log(error)
      setExplanation(null)
      setError(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const toggleQuestionPinStatus = async (questionId: string) => {

    try {
      const response = await axiosInstance.post(API_PATHS.QUESTION.PIN(questionId))

      console.log(response)

      if (response.data && response.data.questions) {
        fetchSessionDetailById()
      }
      toast.success("pinned")
    } catch (error) {
      console.error("Error:", error)
    }

  }

  const uploadMoreQuestions = async () => {
    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {

        role: sessionData?.role,
        experience: sessionData?.experience,
        description: sessionData?.description,
        topicToFocus: sessionData?.topicToFocus,
        numberOfQuestions:10
      })

      const generatedQuestions = aiResponse.data

      const response = await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId, questions: generatedQuestions.data
      })


      if (response.data) {
        toast.success("added more questions")

        fetchSessionDetailById()
      }
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailById()
    }

    return () => { }
  }, [sessionId, sessionData])

  console.log(sessionData)

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicToFocus={sessionData?.topicToFocus || ""}
        experience={Number(sessionData?.experience || null)}
        questions={sessionData?.questions}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt ?

            moment(sessionData.updatedAt).format("DD MM YYYY") : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0 ">
        <h2 className='text-lg font-semibold text-white tracking-wide'>Interview Q&A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>


            {!sessionData ? (
              <p>Loading session ....</p>
            )

              :

              (
                <>
                  <AnimatePresence>
                    {sessionData?.questions?.map((data, index) => {
                      return (
                        <motion.div
                          key={data._id || index}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{
                            duration: 0.4,
                            type: "spring",
                            stifness: 100,
                            delay: index * 0.1,
                            damping: 15
                          }}
                          layout
                          layoutId={`question-${data._id || index}`}
                        >
                          <>
                            <QuestionCard
                              question={data?.question}
                              answer={data.answer}
                              openLearnMoreDrawer={() => generateConceptExplanation(data.question)}
                              isPinned={data?.isPinned}
                              onTogglePin={() => toggleQuestionPinStatus(data._id)}
                            />
                          </>

                          {!isLoading && sessionData?.questions?.length == index + 1 && (
                            <div className='flex items-center jusitify-center mt-5'>
                              <button className='flex text-center gap-3 text-md text-white font-medium bg-black px-5 py-2 rounded-xl' disabled={isLoading || isUpdateLoader} onClick={uploadMoreQuestions}>
                                Load More Questions</button>
                            </div>
                          )}

                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </>
              )
            }



          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading ? explanation?.title : " "}
          >
            {error && (<p><LuCircleAlert />{error}</p>)}
            {/* {isLoading && <SkeletonLoader/>} */}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep