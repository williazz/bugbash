# RUM Troubleshooting Dashboard

A real-time dashboard for troubleshooting and analyzing Real User Monitoring (RUM) data, built with AWS Cloudscape Design System and React.

## Purpose

This dashboard serves as a centralized interface for DevOps and SRE teams to:

- Monitor real-time user interactions and performance metrics
- Investigate user-reported issues through detailed session logs
- Analyze trends in user behavior and system performance
- Configure monitoring parameters and alert thresholds

## Features

### 📊 Performance Dashboard

- Real-time metrics visualization
- Key performance indicators:
  - Active Users
  - Revenue per User
  - Conversion Rate
  - Customer Satisfaction
  - Churn Rate
- Interactive time-series charts with filtering capabilities
- Customizable date ranges and metric combinations

### 📝 System Logs

- Real-time log streaming
- Advanced filtering and search capabilities
- Color-coded log levels (INFO, WARN, ERROR)
- User action tracking
- Session correlation
- Detailed event information including:
  - Timestamp
  - Event Type
  - User ID
  - Action
  - Context Details

### ⚙️ Configuration

- Theme customization (Light/Dark mode)
- Real-time update intervals
- Notification preferences
- Data retention settings
- Export configurations

## Technical Stack

- **Frontend Framework**: React
- **UI Components**: AWS Cloudscape Design System
- **Routing**: React Router
- **State Management**: React Hooks
- **Styling**: Built-in Cloudscape theming

## Mock Features

This demo version includes simulated data for development and testing:

1. **Generated Metrics**

   - Randomized data points with configurable volatility
   - Spike generation for realistic anomaly patterns
   - Time-series data spanning 6 months

2. **Sample Logs**

   - Randomized system events and user actions
   - Various log levels and event types
   - Realistic timestamps and user IDs
   - Searchable content across all fields

3. **Theme Persistence**
   - Local storage-based theme preference
   - System-wide dark/light mode toggle
   - Persistent across sessions

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Access the dashboard at `http://localhost:3000`

## Usage

### Navigation

- Use the top tabs to switch between different views
- URLs update automatically for bookmarking and sharing
- Browser navigation (back/forward) supported

### Logs Investigation

1. Navigate to the Logs tab
2. Use the search bar to filter logs
3. Click column headers to sort
4. Use type filtering for specific log levels

### Metric Analysis

1. Select metrics from the dashboard filters
2. Hover over chart points for detailed values
3. Use the date range selector to focus on specific periods

## Contributing

Feel free to submit issues and enhancement requests!

## License

[MIT License](LICENSE)
