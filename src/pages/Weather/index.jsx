import ResponsiveDrawer from "@/components/sidbar";
import Weather from "@/components/weather";

const WeatherPage = () => {
   
    return (
        <>
       <Weather/>
        </>
      );
}
 
WeatherPage.getLayout = function getLayout(page) {
    return (
      <ResponsiveDrawer>
        {page}
      </ResponsiveDrawer>
    )
  }
export default WeatherPage;