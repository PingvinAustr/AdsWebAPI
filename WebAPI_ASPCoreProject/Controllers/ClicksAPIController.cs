using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace WebAPI_ASPCoreProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClicksAPIController : ControllerBase
    {

        List<SingleCountry> SuitableCountriesList = new List<SingleCountry>();
        List<SingleCountry> AllCountries = new List<SingleCountry>();

        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
         };

        private readonly ILogger<ClicksAPIController> _logger;

        public ClicksAPIController(ILogger<ClicksAPIController> logger)
        {
            _logger = logger;
        }

        public void GetCountriesFromJSON()
        {
            // чтение данных
            using (FileStream fs = new FileStream("InputCountries.json", FileMode.OpenOrCreate))
            {
                AllCountries = JsonSerializer.Deserialize<List<SingleCountry>>(fs);              
            }
        }

        
        public List<SingleCountry> test()
        {
            return AllCountries;
        }


        [HttpGet(Name = "GetWeatherForecast")]
        [HttpGet("{number}")]
        //public List<SingleCountry> Get(string? vertical, string? region, int? budget)
        public CountryClicks Get(string? vertical, string? region, int? budget)
        {

            if (budget == null) budget = 5000;

            Console.WriteLine("Vertical - "+vertical+", region - "+region+", budget - "+budget.ToString());
            GetCountriesFromJSON();
            bool vertical_suits=false, region_suits = false;
            CountryClicks DataToReturn = new CountryClicks();
            DataToReturn.SuitableCountriesArr = new List<string> { };
            DataToReturn.IMG_LinkArr = new List<string> {  };

            foreach (SingleCountry country in AllCountries)
            {
              
                vertical_suits = false;
                region_suits = false;

                foreach (string vert in country.AvailableVerticals)
                {
                    if (vert == vertical)
                    {
                        vertical_suits=true;
                    }
                }

                foreach (string reg in country.AvailableRegions)
                {
                    if (reg== region)
                    {
                        region_suits=true;
                    }
                }

                if (region_suits && vertical_suits)
                {
                    //Console.WriteLine("Country " + country.SingleCountryName + " OK and gives " + country.SingleCountryClicks + " clicks");
                    SuitableCountriesList.Add(country);
                    DataToReturn.SuitableCountriesArr.Add(country.SingleCountryName);
                    DataToReturn.IMG_LinkArr.Add(country.SingleCountryLogo);
                    DataToReturn.SumClicks += country.SingleCountryClicks;

                }
                
               
            }
            DataToReturn.SumClicks = Convert.ToInt32(DataToReturn.SumClicks + (budget/10));
            Console.WriteLine(DataToReturn.SumClicks.ToString());

            //1. Передал в качестве параметра выбранную вертикаль, регион, бюджет
            //2. Выбрал какие страны подходят под регион и вертикаль (Из JSON парсятся данные по каждой стране и подходящей ей вертикали и региону) в список объектов СountryInfo
            //3. Просуммировал клили по странам которые подошли под пункт 2, подходящие страны выделил в массив и передал в CountryClicks
            //4. Умножил  CountryClicks.Clicks (сумма) на коэффициент бюджета
            //5. Вернул на экран браузера 1 экземпляр класса CountryClicks в котором будет сумма кликов, а также в нем будет массив подходящих стран CountryInfo

            return DataToReturn;           
        }
    }
}