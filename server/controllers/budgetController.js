const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getBudget = async (req, res) => {
  try {
    const tripId = req.params.tripId;

    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId: req.user.userId },
      include: {
        stops: {
          include: { activities: true }
        }
      }
    });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    let totalCost = 0;
    const categoryBreakdown = {
      SIGHTSEEING: 0,
      FOOD: 0,
      ADVENTURE: 0,
      CULTURE: 0,
      OTHER: 0
    };

    trip.stops.forEach(stop => {
      stop.activities.forEach(activity => {
        totalCost += activity.cost;
        categoryBreakdown[activity.type] += activity.cost;
      });
    });

    const days = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) || 1;
    const averagePerDay = totalCost / days;

    // A simple mock calculation to "flag over-budget days" since we don't have a daily budget defined
    const overBudgetDaysFlag = false;

    res.status(200).json({
      success: true,
      data: {
        totalCost,
        categoryBreakdown,
        averagePerDay,
        overBudgetDaysFlag
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getBudget };
