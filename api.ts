export type ApiResponse = {
  DISPLAY: Record<string, Crypto>;
};

export interface Crypto {
  EUR: {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: string;
    PRICE: number;
    LASTUPDATE: number;
    MEDIAN: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: string;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    OPENDAY: number;
    HIGHDAY: number;
    LOWDAY: number;
    OPEN24HOUR: number;
    HIGH24HOUR: number;
    LOW24HOUR: number;
    LASTMARKET: string;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
    OPENHOUR: number;
    HIGHHOUR: number;
    LOWHOUR: number;
    TOPTIERVOLUME24HOUR: number;
    TOPTIERVOLUME24HOURTO: number;
    CHANGE24HOUR: number;
    CHANGEPCT24HOUR: number;
    CHANGEDAY: number;
    CHANGEPCTDAY: number;
    CHANGEHOUR: number;
    CHANGEPCTHOUR: number;
    CONVERSIONTYPE: string;
    CONVERSIONSYMBOL: string;
    SUPPLY: number;
    MKTCAP: number;
    MKTCAPPENALTY: number;
    TOTALVOLUME24H: number;
    TOTALVOLUME24HTO: number;
    TOTALTOPTIERVOLUME24H: number;
    TOTALTOPTIERVOLUME24HTO: number;
    IMAGEURL: string;
  };
}

export const getCryptosPrices = async (
  cryptos: string[]
): Promise<ApiResponse> => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptos.join(
      ","
    )}&tsyms=EUR`
  );
  return response.json();
};
