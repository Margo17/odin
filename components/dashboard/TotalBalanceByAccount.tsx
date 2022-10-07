import React from "react";

import { Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Kraken", value: 400 },
  { name: "Gemini", value: 300 },
  { name: "Coinbase", value: 300 },
  { name: "Binance", value: 200 },
  { name: "Crypto.com", value: 400 },
  { name: "KuCoin", value: 300 },
  { name: "BitYard", value: 300 },
  { name: "eToro", value: 200 },
];

const COLORS = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

const RADIAN = Math.PI / 180;

type CustomizedLabelType = {
  cx: string;
  cy: string;
  midAngle: string;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelType) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const TotalBalanceByAccount = () => {
  return (
    <Box
      border="5px"
      flex="1"
      h="19rem"
      w="100%"
      borderWidth="5px"
      borderRadius="10px"
      borderColor="gray.500"
      background="whiteAlpha.900"
      boxShadow="lg"
      textAlign="center"
    >
      <Text fontWeight="bold" width="100%" height="20%" p="20px">
        Total Balance By Account
      </Text>
      <ResponsiveContainer width="90%" height="70%">
        <PieChart width={320} height={320}>
          <Legend layout="vertical" verticalAlign="top" align="right" />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TotalBalanceByAccount;
