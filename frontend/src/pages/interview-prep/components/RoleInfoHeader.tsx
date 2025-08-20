import type { QuestionType } from '../../../utils/types'

interface RoleInforHeaderProps {
  role: string
  topicToFocus: string
  experience: number
  questions?: QuestionType[]
  description: string
  lastUpdated: string
}

const RoleInfoHeader: React.FC<RoleInforHeaderProps> = ({
  role,
  topicToFocus,
  experience,
  questions,
  lastUpdated
}) => (
  <div className="bg-gradient-to-r from-orange-400 to-amber-500 h-52 flex items-center">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{role}</h2>
      <p className="text-white/90 mt-1 text-sm">{topicToFocus}</p>

      <div className="flex items-center gap-3 mt-4">
        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
        </span>
        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {questions?.length} Q&A
        </span>
        <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
          Updated: {lastUpdated}
        </span>
      </div>
    </div>
  </div>
)

export default RoleInfoHeader