import  { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { CARD_BG } from '../../utils/data'
import SummaryCard from '../../components/cards/SummaryCard'
import moment from 'moment'
import Modal from '../../components/Modal'
import CreateSessionForm from './CreateSessionForm'
import DeleteAlertContent from '../../components/DeleteAlertContent'
import { toast } from 'react-toastify'

export interface QuestionType {

  _id: string,
  question: string,
  answer: string,
  isPinned?: boolean,
  createdAt?: string

}

export interface sessionType {
  _id: string,
  user: string,
  role: string,
  experience: string,
  topicToFocus: string,
  description: string,
  questions: QuestionType[]
  updatedAt?: string,
  createdAt?: string,

}
const Dashboard = () => {
  const navigate = useNavigate()

  const [opencreateModal, setOpenCreateModal] = useState<boolean>(false)


  const [sessions, setSessions] = useState<sessionType[]>([])

  const [openDeleteAlert, setOpenDeleteAlert] = useState<{
    open: boolean;
    data: sessionType | null
  }>({
    open: false, data: null
  })


  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data.sessions)
      toast.success("all sessions fetched")
    } catch (error) {
      toast.error(`${error}`)
      console.log(error)
      return error;
    }
  }

  const deleteSession = async (sessionData: sessionType) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id))
      setOpenDeleteAlert({
       open:false,
       data:null 
      })
      toast.success("session deleted")
    fetchAllSessions()
    } catch (error) {
      toast.error(`${error}`)
      console.log(error)
      return error;
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, []);


  console.log(sessions)
  return (
    <DashboardLayout>

      <div className='conatiner mx-auto pt-4 pb-4 bg-[#161414] '>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={index}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicToFocus={data?.topicToFocus || ""}
              experience={Number(data?.experience || "")}
              questions={data?.questions}

              description={data.description || ""}
              lastUpdated={
                data?.updatedAt ?

                  moment(data.updatedAt).format("DD MM YYYY") : ""
              }

              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data: data || null })}
            />
          ))}
        </div>

        <button className='flex justify-center items-center gap-3 bg-linear-to-r from-[#ff9324] to-[#ff99ab] text-md font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white  transition-colors cursor-pointer fixed bottom-10 md:bottom-20 right-10'
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus className='text-2xl text-white' />
          Add new</button>
      </div>
      <Modal
        isOpen={opencreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        title=''
      >
        <div><CreateSessionForm /></div>

      </Modal>

      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => { setOpenDeleteAlert({ open: false, data: null }) }}
        title="Delete alert"
        hideHeader={true}
        >
        <div className='w-[30vw]'> 
          <DeleteAlertContent content="are you sure you want to delete this session detail?" onDelete={()=>deleteSession(openDeleteAlert?.data!)}
          /> 
        </div>

      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard