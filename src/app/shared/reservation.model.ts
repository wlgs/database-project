export interface Reservation {
  id: number,
  client_id: number,
  status: string,
  room_id: number,
  start_date: string,
  end_date: string
}