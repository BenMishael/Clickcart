import 'dart:convert';
import 'package:http/http.dart' as http;
import '../utility/constants.dart';

class CoinbaseService {
  final String apiKey = COINBASE_API_KEY;
  final String apiUrl = 'https://api.commerce.coinbase.com/charges';

  Future<Map<String, dynamic>> createCharge(double amount, String currency, String description) async {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        'Content-Type': 'application/json',
        'X-CC-Api-Key': apiKey,
        'X-CC-Version': '2018-03-22',
      },
      body: jsonEncode({
        'name': 'Order Payment',
        'description': description,
        'pricing_type': 'fixed_price',
        'local_price': {
          'amount': amount.toString(),
          'currency': currency,
        },
      }),
    );

    if (response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to create charge: ${response.body}');
    }
  }
}
