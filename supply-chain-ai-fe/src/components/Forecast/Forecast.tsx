const Forecast = ({ forecast }: any) => {
  console.log(forecast)
  return (
    <div className='bg-green-100 p-8'>
      <div className='font-bold text-4xl text-center mb-12 mt-0 text-green-500'>Result</div>
      {forecast?.map((item: any) => (
        <div className='bg-green-50 my-2 p-2 rounded-md border-2 border-green-200'>
          <div>
            <b>Suitable Route:</b> {item.suitable_route}
          </div>
          <div>
            <b>Product Consumption Region:</b> {item.product_comsumption_region}
          </div>
          <div>
            <b>Traffic:</b> {item.traffic}
          </div>
          <div className='text-amber-500'>
            <b>{item.shipment_result}</b>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Forecast
