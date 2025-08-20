import { useEffect, useState } from 'react'
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
  _id: string
  question: string
  answer: string
  isPinned?: boolean
  createdAt?: string
}

export interface sessionType {
  _id: string
  user: string
  role: string
  experience: string
  topicToFocus: string
  description: string
  questions: QuestionType[]
  updatedAt?: string
  createdAt?: string
}

const Dashboard = () => {
  const navigate = useNavigate()
  const [opencreateModal, setOpenCreateModal] = useState(false)
  const [sessions, setSessions] = useState<sessionType[]>([])
  const [openDeleteAlert, setOpenDeleteAlert] = useState<{ open: boolean; data: sessionType | null }>({ open: false, data: null })

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL)
      setSessions(response.data.sessions)
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  const deleteSession = async (sessionData: sessionType) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id))
      setOpenDeleteAlert({ open: false, data: null })
      toast.success('Session deleted')
      fetchAllSessions()
    } catch (error) {
      toast.error(`${error}`)
    }
  }

  useEffect(() => {
    fetchAllSessions()
  }, [])

  return (
    <DashboardLayout>
      <div className="w-full bg-gradient-to-br from-[#fef7f0] via-[#fef7f0] to-[#f0f4ff] min-h-screen">
        <div className="container mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">My Interview Sessions</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((data, index) => (
              <SummaryCard
                key={index}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data.role}
                topicToFocus={data.topicToFocus}
                experience={Number(data.experience)}
                questions={data.questions}
                description={data.description}
                lastUpdated={data.updatedAt ? moment(data.updatedAt).format('DD MMM YYYY') : ''}
                onSelect={() => navigate(`/interview-prep/${data._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>

          <button
            onClick={() => setOpenCreateModal(true)}
            className="fixed bottom-10 right-10 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:opacity-90 transition flex items-center gap-2"
          >
            <LuPlus className="text-xl" />
            Add new
          </button>
        </div>

        <Modal isOpen={opencreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
          <CreateSessionForm />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          hideHeader
        >
          <div className="w-[90vw] max-w-sm">
            <DeleteAlertContent
              content="Are you sure you want to delete this session?"
              onDelete={() => deleteSession(openDeleteAlert.data!)}
            />
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard