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
  experience: number,
  topicToFocus: string,
  description: string,
  questions: QuestionType[]
  updatedAt?: string,
  createdAt?: string,
lastUpdated?:string
}