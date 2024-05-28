import Container from '../../components/Shared/Container'
import { Helmet } from 'react-helmet-async'
import RoomReservation from '../../components/RoomDetails/RoomReservation'
import Heading from '../../components/Shared/Heading'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAxiosCommon from '../../hooks/useAxiosCommon'

const RoomDetails = () => {
  const { id } = useParams()
  const axiosCommon = useAxiosCommon()

  const {
    data: room = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['room', id],
    queryFn: async () => {
      const { data } = await axiosCommon.get(`/room/${id}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />
  console.log(room)
  return (
    <Container>
      <Helmet>
        <title>{room?.title}</title>
      </Helmet>
      {room && (
        <div className='max-w-screen-lg mx-auto'>
          {/* Header */}
          <div className='flex flex-col gap-6'>
            <div>
              <Heading title={room.title} subtitle={room.location} />
              <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img
                  className='object-cover w-full'
                  src={room.image}
                  alt='header image'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            {/* Room Info */}
            <div className='col-span-4 flex flex-col gap-8'>
              <div className='flex flex-col gap-2'>
                <div
                  className='
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              '
                >
                  <div>Hosted by {room?.host?.name}</div>

                  <img
                    className='rounded-full'
                    height='30'
                    width='30'
                    alt='Avatar'
                    referrerPolicy='no-referrer'
                    src={room?.host?.image}
                  />
                </div>
                <div
                  className='
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              '
                >
                  <div>{room?.guests} guests</div>
                  <div>{room?.bedrooms} rooms</div>
                  <div>{room?.bathrooms} bathrooms</div>
                </div>
              </div>

              <hr />
              <div
                className='
          text-lg font-light text-neutral-500'
              >
                {room?.description}
              </div>
              <hr />
            </div>

            <div className='md:col-span-3 order-first md:order-last mb-10'>
              {/* RoomReservation */}
              <RoomReservation refetch={refetch} room={room} />
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}

export default RoomDetails
