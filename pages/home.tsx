import BaseLayout from '@/src/components/BaseLayout'
import Card from '../src/components/Card'
import Button from '@/components/main/Button'
import AddIcon from '@/components/icons/AddIcon'

interface CardData {
  title: string
  description: string
  imageUrl: string
}

const cardData: CardData[] = [
  {
    title: 'Tarjeta 1',
    description: 'Descripción de la tarjeta 1',
    imageUrl: '/img/Folder.png'
  },
  {
    title: 'Tarjeta 2',
    description: 'Descripción de la tarjeta 2',
    imageUrl: '/img/Folder.png'
  },
  {
    title: 'Tarjeta 3',
    description: 'Descripción de la tarjeta 3',
    imageUrl: '/img/Folder.png'
  },
  {
    title: 'Tarjeta 4',
    description: 'Descripción de la tarjeta 4',
    imageUrl: '/img/Folder.png'
  },
  {
    title: 'Tarjeta 4',
    description: 'Descripción de la tarjeta 4',
    imageUrl: '/img/Folder.png'
  }
]

const Home = () => {
  return (
    <BaseLayout>
      <div className="p-10 w-full">
        <div className="mt-12 flex justify-between items-center px-12 bg-gray2">
          <h1 className="text-xl">Proyectos Recientes</h1>
          <div>
            <Button variant="primary" text="Nuevo proyecto" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-9">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home
