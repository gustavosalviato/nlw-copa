import Image from "next/image"
import bannerPreview from '../assets/banner.png'
import logo from '../assets/logo.svg'
import usersExampleImg from '../assets/users-example.png'
import iconChecked from '../assets/icon-checked.svg'

interface HomeProps {
  count: number
}

const Home = ({ count }: HomeProps) => {
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
            <span className="text-green-300">+12.592</span> pessoas já estão usando
          </strong>

        </div>

        <form className="mt-10 flex gap-2">

          <input
            className="flex-1 py-4 px-6 bg-gray-800 border border-gray-500 rounded text-white outline-0 text-sm"
            type="text"
            placeholder="Qual nome do seu bolão?"
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
              <span className="font-bold text-2xl">+2021</span>
              <span className="font-normal text-base">Bolões criados </span>
            </div>
          </div>

          <div />

          <div className="flex items-center gap-6 text-gray-100">
            <Image src={iconChecked} alt="" />
            <div className="flex flex-col text">
              <span className="font-bold text-2xl">+2021</span>
              <span className="font-normal text-base">Bolões criados </span>
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
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  console.log(data)

  return {
    props: {
      count: data.count
    }
  }
}