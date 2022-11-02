import Image from "next/image"
import bannerPreview from '../assets/banner.png'
import logo from '../assets/logo.svg'
import usersExampleImg from '../assets/users-example.png'
import iconChecked from '../assets/icon-checked.svg'
import { api } from "../lib/api"
import { FormEvent, useState } from "react"

interface HomeProps {
  poolsCount: number,
  guessesCount: number,
  usersCount: number,
}

const Home = ({ poolsCount, guessesCount, usersCount }: HomeProps) => {
  const [poolTitle, setPoolTitle] = useState('')

  const handleSubmitForm = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      })

      const { code } = response.data

      navigator.clipboard.writeText(code)

      alert('Bolão criado com sucesso, o código foi copiado na área de transferência')

    } catch (err) {
      console.log(err)
      alert('Falha ao criar bolão, tente novamente')
    }
  } 
  return (
    <div className="h-screen mx-auto max-w-[1124px] grid grid-cols-2 items-center gap-28">
      <main>
        <Image
          src={logo}
          alt="NLW Copa"
        />

        <h1 className="mt-10 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex gap-2 items-center ">
          <Image
            src={usersExampleImg}
            alt=""
          />

          <strong className="text-xl text-gray-100 leading-relaxed font-bold">
            <span className="text-green-300">+{usersCount}</span> pessoas já estão usando
          </strong>

        </div>

        <form className="mt-10 flex gap-2" onSubmit={handleSubmitForm}>

          <input
            className="flex-1 py-4 px-6 bg-gray-800 border border-gray-500 rounded text-gray-100 outline-0 text-sm"
            type="text"
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            onChange={(e) => setPoolTitle(e.target.value)}
          />

          <button
            className="py-4 px-6 bg-yellow-500 font-bold text-black border-0 rounded text-sm hover:bg-yellow-700"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="text-sm leading-relaxed text-gray-300 mt-4">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
        </p>

        <div className="flex mt-10 pt-10 border-t border-gray-500 justify-between">

          <div className="flex items-center gap-6 text-gray-100">
            <Image src={iconChecked} alt="" />
            <div className="flex flex-col text">
              <span className="font-bold text-2xl">+{poolsCount}</span>
              <span className="font-normal text-base">Bolões criados </span>
            </div>
          </div>

          <div className="w-[1px] bg-gray-500 h-14" />

          <div className="flex items-center gap-6 text-gray-100">
            <Image src={iconChecked} alt="" />
            <div className="flex flex-col text">
              <span className="font-bold text-2xl">+{guessesCount}</span>
              <span className="font-normal text-base">Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>


      <Image
        src={bannerPreview}
        alt="Dois celulares exibindo uma prévia da aplicação móvel no nlw Copa"
      />


    </div>
  )
}

export default Home

export const getServerSideProps = async () => {

  const [poolCountResponse, guessesCountResponse, userCountResponse] = await Promise.all([
    api.get('/pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count'),
  ])


  return {
    props: {
      poolsCount: poolCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: userCountResponse.data.count,
    }
  }
}