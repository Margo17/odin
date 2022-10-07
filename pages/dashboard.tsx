import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Flex, useMediaQuery, Box } from "@chakra-ui/react";
import Shell from "../components/shell";
import PnlCard from "../components/dashboard/PnlCard";
import TotalBalances from "../components/dashboard/TotalBalances";
import TotalBalanceByAccount from "../components/dashboard/TotalBalanceByAccount";
import LastAndActiveTrades from "../components/dashboard/LastAndActiveTrades";
import TotalTraderCard from "../components/dashboard/TotalTraderCard";
import AvgTradeDurationCard from "../components/dashboard/AvgTradeDurationCard";
import RatioCard from "../components/dashboard/RatioCard";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "translation",
        "common",
        "messages",
      ])),
    },
  };
}

const Dashboard = () => {
  const [isLargerThan1410, isLargerThan1244, isLargerThan645] = useMediaQuery([
    "(min-width: 1410px)",
    "(min-width: 1244px)",
    "(min-width: 645px)",
  ]);

  return (
    <Shell pageName="Dashboard" pageSubName="View your statistics">
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        gap={3}
        w="100%"
      >
        {isLargerThan645 ? (
          <Flex flexDirection="row" gap={3}>
            <PnlCard
              label="Net Worth (USDT)"
              mainStat={768.39}
              additionalStat={23.36}
              arrowType="increase"
            />
            <PnlCard
              label="Today PNL"
              mainStat={232.71}
              additionalStat={13.21}
              arrowType="decrease"
            />
            <PnlCard
              label="Yesterday PNL"
              mainStat={88.4}
              additionalStat={5.85}
              arrowType="decrease"
            />
            <PnlCard
              label="Week PNL"
              mainStat={1460.1}
              additionalStat={81.3}
              arrowType="increase"
            />
            <PnlCard
              label="Month PNL"
              mainStat={2132.77}
              additionalStat={11.4}
              arrowType="increase"
            />
          </Flex>
        ) : (
          <Box>
            <Flex flexDirection="row" gap={3}>
              <PnlCard
                label="Net Worth (USDT)"
                mainStat={768.39}
                additionalStat={23.36}
                arrowType="increase"
              />
              <PnlCard
                label="Today PNL"
                mainStat={232.71}
                additionalStat={13.21}
                arrowType="decrease"
              />
            </Flex>
            <Flex mt="3" flexDirection="row" gap={3}>
              <PnlCard
                label="Yesterday PNL"
                mainStat={88.4}
                additionalStat={5.85}
                arrowType="decrease"
              />
              <PnlCard
                label="Week PNL"
                mainStat={1460.1}
                additionalStat={81.3}
                arrowType="increase"
              />
              <PnlCard
                label="Month PNL"
                mainStat={2132.77}
                additionalStat={11.4}
                arrowType="increase"
              />
            </Flex>
          </Box>
        )}
        <Flex
          flexDirection={isLargerThan1244 ? "row" : "column"}
          alignItems="center"
          gap={3}
        >
          <TotalBalances />
          <TotalBalanceByAccount />
        </Flex>
        <Flex
          flexDirection={isLargerThan1410 ? "row" : "column"}
          alignItems="center"
          gap={3}
        >
          <LastAndActiveTrades />
          <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            gap="1"
            h="16rem"
          >
            <TotalTraderCard traderAmount={40} winAmount={13} lossAmount={27} />
            <AvgTradeDurationCard avgDuration="10h 25min" />
            <RatioCard
              longPercentage={70}
              longAmount={28}
              shortPercentage={30}
              shortAmount={12}
            />
          </Flex>
        </Flex>
      </Flex>
    </Shell>
  );
};

export default Dashboard;
