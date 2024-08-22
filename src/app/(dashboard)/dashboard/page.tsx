import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { totalMembersData } from "@/lib/data";
import {
  Card,
  Text,
  Metric,
  BadgeDelta,
  Flex,
  Title,
  AreaChart,
} from "@tremor/react";

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader title="Home" />
      <div className="flex lg:flex-row gap-4 flex-col px-5">
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Total members</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +20%
            </BadgeDelta>
          </Flex>
          <Metric>1918</Metric>
        </Card>
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Enrolled members</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +10%
            </BadgeDelta>
          </Flex>
          <Metric>1736</Metric>
        </Card>
        <Card className="rounded-lg">
          <Flex justifyContent="between" alignItems="center">
            <Text>Active now</Text>
            <BadgeDelta
              deltaType="moderateIncrease"
              isIncreasePositive={true}
              size="sm"
            >
              +19%
            </BadgeDelta>
          </Flex>
          <Metric>132</Metric>
        </Card>
      </div>
      <div className="px-5">
        <Card className="rounded-lg ">
          <Title>Course Members</Title>
          <AreaChart
            className="rounded-md"
            data={totalMembersData}
            index="date"
            categories={["Total members"]}
          />
        </Card>
      </div>
    </DashboardShell>
  );
}
