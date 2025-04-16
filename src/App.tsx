import React, { useState, useEffect } from "react";
import {
  AppLayout,
  Container,
  Header,
  LineChart,
  Box,
  SpaceBetween,
  Cards,
  ColumnLayout,
  Tabs,
  Table,
  Toggle,
  FormField,
  Input,
  Select,
  TextFilter,
} from "@cloudscape-design/components";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

// Data generation utilities
const generateData = (baseValue, volatility, spikeChance = 0.3) => {
  const months = 6;
  const data = [];
  let value = baseValue;

  for (let i = 0; i < months; i++) {
    const date = new Date(2024, i, 1);
    const hasSpike = Math.random() < spikeChance;

    if (hasSpike) {
      const spikeDirection = Math.random() < 0.5 ? 1 : -1;
      value = baseValue + spikeDirection * volatility * (1 + Math.random());
    } else {
      value = value + (Math.random() - 0.5) * (volatility * 0.5);
    }

    value = Math.max(0, Math.round(value));
    data.push({
      date: date.toISOString().split("T")[0],
      value: value,
    });
  }
  return data;
};

const metricsData = {
  activeUsers: generateData(1000, 500),
  revenuePerUser: generateData(50, 30),
  conversionRate: generateData(15, 8),
  customerSatisfaction: generateData(85, 15),
  churnRate: generateData(5, 4),
};

// Generate mock logs
const generateLogs = () => {
  const logTypes = ["INFO", "WARN", "ERROR"];
  const actions = [
    "User login attempt",
    "Data sync completed",
    "Payment processing failed",
    "API request timeout",
    "Cache cleared successfully",
    "Database backup started",
    "Email notification sent",
    "User profile updated",
    "Security alert triggered",
    "System health check",
  ];
  const users = ["user123", "admin", "system", "api-service", "backup-service"];
  const logs = [];

  for (let i = 0; i < 50; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i * 15);
    const user = users[Math.floor(Math.random() * users.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const type = logTypes[Math.floor(Math.random() * logTypes.length)];

    logs.push({
      timestamp: date.toISOString(),
      type,
      action,
      details: `${user} - ${action} - Event ID: ${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      user,
    });
  }
  return logs;
};

// Dashboard Tab Content Component
const DashboardContent = () => (
  <SpaceBetween size="l">
    <Container header={<Header variant="h2">Key Metrics</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        {[
          { title: "Active Users", value: "1,234" },
          { title: "Total Revenue", value: "$45,678" },
          { title: "Conversion Rate", value: "2.4%" },
        ].map((metric, index) => (
          <Box textAlign="center" key={index}>
            <Box variant="h3">{metric.title}</Box>
            <Box variant="h1">{metric.value}</Box>
          </Box>
        ))}
      </ColumnLayout>
    </Container>

    <Container
      header={<Header variant="h2">Monthly Performance Metrics</Header>}
    >
      <LineChart
        series={[
          {
            title: "Active Users (hundreds)",
            type: "line",
            data: metricsData.activeUsers.map((point) => ({
              x: new Date(point.date),
              y: point.value / 100,
            })),
            color: "#16db93",
          },
          {
            title: "Revenue per User ($)",
            type: "line",
            data: metricsData.revenuePerUser.map((point) => ({
              x: new Date(point.date),
              y: point.value,
            })),
            color: "#efea5a",
          },
          {
            title: "Conversion Rate (%)",
            type: "line",
            data: metricsData.conversionRate.map((point) => ({
              x: new Date(point.date),
              y: point.value,
            })),
            color: "#f29e4c",
          },
          {
            title: "Customer Satisfaction (%)",
            type: "line",
            data: metricsData.customerSatisfaction.map((point) => ({
              x: new Date(point.date),
              y: point.value,
            })),
            color: "#1982c4",
          },
          {
            title: "Churn Rate (%)",
            type: "line",
            data: metricsData.churnRate.map((point) => ({
              x: new Date(point.date),
              y: point.value,
            })),
            color: "#ff595e",
          },
        ]}
        xDomain={[new Date("2024-01-01"), new Date("2024-06-01")]}
        yDomain={[0, 100]}
        height={400}
        xScaleType="time"
        legendPosition="right"
        statusType="finished"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data to display
            </Box>
          </Box>
        }
        loadingText="Loading chart data..."
        ariaLabel="Monthly performance metrics line chart"
        xTitle="Time Period"
        yTitle="Value"
        hideFilter={false}
        additionalFilters={
          <Box padding={{ vertical: "s" }}>Select metrics to display</Box>
        }
        i18nStrings={{
          filterLabel: "Filter visible metrics",
          filterPlaceholder: "Search metrics",
          filterSelectedAriaLabel: "selected",
          legendAriaLabel: "Legend",
          chartAriaRoleDescription: "line chart",
        }}
      />
    </Container>
  </SpaceBetween>
);

// Logs Tab Content Component
const LogsContent = () => {
  const [filterText, setFilterText] = useState("");
  const [allLogs] = useState(generateLogs());

  const filteredLogs = allLogs.filter((log) => {
    if (!filterText) return true;

    const searchText = filterText.toLowerCase();
    return (
      log.timestamp.toLowerCase().includes(searchText) ||
      log.type.toLowerCase().includes(searchText) ||
      log.action.toLowerCase().includes(searchText) ||
      log.details.toLowerCase().includes(searchText) ||
      log.user.toLowerCase().includes(searchText)
    );
  });

  return (
    <SpaceBetween size="m">
      <TextFilter
        filteringText={filterText}
        filteringPlaceholder="Search logs..."
        filteringAriaLabel="Filter logs"
        onChange={({ detail }) => setFilterText(detail.filteringText)}
        countText={`${filteredLogs.length} matches`}
        clearAriaLabel="Clear filter"
      />
      <Table
        header={
          <Header variant="h2" counter={`(${filteredLogs.length})`}>
            System Logs
          </Header>
        }
        columnDefinitions={[
          {
            id: "timestamp",
            header: "Timestamp",
            cell: (item) => new Date(item.timestamp).toLocaleString(),
            sortingField: "timestamp",
          },
          {
            id: "type",
            header: "Type",
            cell: (item) => (
              <Box
                color={
                  item.type === "ERROR"
                    ? "text-status-error"
                    : item.type === "WARN"
                    ? "text-status-warning"
                    : "text-status-success"
                }
              >
                {item.type}
              </Box>
            ),
            sortingField: "type",
          },
          {
            id: "user",
            header: "User",
            cell: (item) => item.user,
            sortingField: "user",
          },
          {
            id: "action",
            header: "Action",
            cell: (item) => item.action,
            sortingField: "action",
          },
          {
            id: "details",
            header: "Details",
            cell: (item) => item.details,
            sortingField: "details",
          },
        ]}
        items={filteredLogs}
        loading={false}
        loadingText="Loading logs..."
        sortingDisabled
        variant="container"
        stickyHeader
        stripedRows
        empty={
          <Box textAlign="center" color="inherit">
            <b>No logs found</b>
            <Box variant="p" color="inherit">
              No logs match the current filter criteria
            </Box>
          </Box>
        }
      />
    </SpaceBetween>
  );
};

// Settings Tab Content Component
const SettingsContent = () => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    return {
      value: savedTheme,
      label: savedTheme.charAt(0).toUpperCase() + savedTheme.slice(1),
    };
  });

  const handleThemeChange = ({ detail }) => {
    setSelectedTheme(detail.selectedOption);
    applyMode(detail.selectedOption.value as Mode);
    localStorage.setItem("theme", detail.selectedOption.value);
  };

  return (
    <SpaceBetween size="l">
      <Container header={<Header variant="h2">Display Settings</Header>}>
        <SpaceBetween size="m">
          <FormField
            label="Theme"
            description="Switch between light and dark mode"
          >
            <Select
              selectedOption={selectedTheme}
              onChange={handleThemeChange}
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
          </FormField>
          <FormField label="Refresh Interval (minutes)">
            <Input type="number" value="5" />
          </FormField>
          <Toggle checked={true}>Enable real-time updates</Toggle>
          <Toggle checked={true}>Show notifications</Toggle>
        </SpaceBetween>
      </Container>

      <Container header={<Header variant="h2">Data Settings</Header>}>
        <SpaceBetween size="m">
          <FormField label="Data retention period">
            <Select
              selectedOption={{ value: "30" }}
              options={[
                { value: "7", label: "7 days" },
                { value: "30", label: "30 days" },
                { value: "90", label: "90 days" },
              ]}
            />
          </FormField>
          <Toggle checked={true}>Enable data export</Toggle>
          <Toggle checked={false}>Advanced metrics</Toggle>
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
};

// Layout component that provides the app structure and navigation
const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToTabId = {
    "/": "dashboard",
    "/logs": "logs",
    "/settings": "settings",
  };

  return (
    <AppLayout
      content={
        <SpaceBetween size="l">
          <Header variant="h1">Analytics Dashboard</Header>
          <Tabs
            activeTabId={pathToTabId[location.pathname] || "dashboard"}
            onChange={({ detail }) => {
              switch (detail.activeTabId) {
                case "logs":
                  navigate("/logs");
                  break;
                case "settings":
                  navigate("/settings");
                  break;
                default:
                  navigate("/");
              }
            }}
            tabs={[
              {
                label: "Dashboard",
                id: "dashboard",
              },
              {
                label: "Logs",
                id: "logs",
              },
              {
                label: "Settings",
                id: "settings",
              },
            ]}
          />
          <Outlet />
        </SpaceBetween>
      }
      navigationHide
      toolsHide
    />
  );
};

// Root App component
const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyMode(savedTheme as Mode);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardContent />} />
          <Route path="logs" element={<LogsContent />} />
          <Route path="settings" element={<SettingsContent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
